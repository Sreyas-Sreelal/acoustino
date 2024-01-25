mod frequency;
mod note;
mod parser;

use glob::glob;
use note::Note;
use std::{
    error::Error,
    fs::{create_dir, File},
    path::PathBuf,
};
use uuid::Uuid;
use zip_extract::extract;

pub fn extract_mxl_file(file: &str) -> Result<String, Box<dyn Error>> {
    let temp_path = std::env::temp_dir().join("acoustino");
    if !temp_path.exists() {
        create_dir(&temp_path)?;
    }

    //dbg!(&temp_path);
    let buf = File::open(file)?;
    let uuid = Uuid::new_v4();
    let dir_name = uuid.hyphenated().to_string();
    //dbg!(&dir_name);

    extract(&buf, &PathBuf::from(&temp_path.join(&dir_name)), true)?;
    for path in glob(&(temp_path.join(&dir_name).to_str().unwrap().to_owned() + "/**/*.xml"))
        .expect("Failed to read glob pattern")
        .flatten()
    {
        let path = path.display().to_string();
        if path.ends_with("container.xml") {
            continue;
        }

        //dbg!(&path);
        return Ok(path);
    }

    Err(
        "Failed to extract given mxl file, try extracting it manually!"
            .to_string()
            .into(),
    )
}

fn code_generate(notes: Vec<Note>, pin: isize) -> String {
    let mut code = String::new();
    code.push_str("const int melody[] PROGMEM = {\n");
    for x in notes.clone() {
        code.push_str(&format!("{},", x.frequency));
    }
    code.push_str("\n};\n\n");
    code.push_str("const int duration[] PROGMEM = {\n");
    for x in notes {
        code.push_str(&format!("{},", x.duration));
    }
    code.push_str("\n};\n\n");

    code.push_str(&format!(
        "
void setup() {{
    for (int thisNote = 0; thisNote < sizeof(melody) / sizeof(int); thisNote++) {{
        int val_melody = pgm_read_word(&melody[thisNote]);
        int val_duration = pgm_read_word(&duration[thisNote]);
        tone({pin}, val_melody, val_duration * .5 );
        delay(val_duration);
        noTone({pin});
    }}
}}
void loop(){{ }}   
    "
    ));

    code
}

pub fn do_conversion(path: &str, pin: isize) -> Result<String, Box<dyn Error>> {
    let notes = parser::parse_mxml(path)?;
    Ok(code_generate(notes, pin))
}
