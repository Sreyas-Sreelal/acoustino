mod frequency;
mod note;
mod parser;

use note::Note;
use std::error::Error;

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
