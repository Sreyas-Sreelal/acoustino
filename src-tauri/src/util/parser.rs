use quick_xml::events::Event;
use quick_xml::reader::Reader;
use std::error::Error;

use super::{frequency::get_frequency_from_note, note::Note};

pub fn parse_mxml(path: &str) -> Result<Vec<Note>, Box<dyn Error>> {
    let mut notes = Vec::new();
    let mut reader = Reader::from_file(path)?;
    reader.trim_text(true);
    let mut divisions = 1;
    let mut tempo = 1;
    let mut buf = Vec::new();
    let mut marker = "";
    loop {
        match reader.read_event_into(&mut buf) {
            Err(_) => return Err("Invalid MusicXML file passed!".into()),
            Ok(Event::Eof) => break,
            Ok(Event::Start(e)) => match e.name().as_ref() {
                b"note" => {
                    notes.push(Note::default());
                }
                b"step" => marker = "step",
                b"octave" => marker = "octave",
                b"duration" => marker = "duration",
                b"divisions" => marker = "divisions",
                _ => {
                    marker = "";
                }
            },
            Ok(Event::Empty(e)) => {
                if e.name().as_ref() == b"sound" {
                    if tempo == 1 {
                        //let mut count = 0;
                        let mut iter = e.attributes();
                        while let Some(Ok(x)) = iter.next() {
                            if x.key == quick_xml::name::QName(b"tempo") {
                                tempo = x
                                    .value
                                    .clone()
                                    .iter()
                                    .map(|x| *x as char)
                                    .collect::<String>()
                                    .parse()?;
                                break;
                            }
                            //count += 1;
                        }
                        if tempo == 1 {
                            tempo = 120;
                        }
                    }
                }
            }
            Ok(Event::End(e)) => match e.name().as_ref() {
                b"part" => break,
                b"note" => {
                    if let Some(note) = notes.last_mut() {
                        note.frequency =
                            if let Some(freq) = get_frequency_from_note(&note.generate_note()) {
                                freq
                            } else {
                                panic!("Unknown frequency found!");
                            };
                        note.duration *=
                            (60.0 / (tempo as f32) / (divisions as f32) * 1000.0).round() as isize;
                        if note.duration > 10000 {
                            note.duration /= 100;
                        }
                    }
                }
                _ => {}
            },
            Ok(Event::Text(e)) => {
                if let Some(note) = notes.last_mut() {
                    match marker {
                        "step" => note.step = e.unescape().unwrap().into_owned(),
                        "octave" => note.octave = e.unescape().unwrap().into_owned(),
                        "duration" => note.duration = e.unescape().unwrap().into_owned().parse()?,
                        _ => {}
                    }
                }
                if divisions == 1 && marker == "divisions" {
                    divisions = e.unescape().unwrap().into_owned().parse()?
                }
            }
            _ => (),
        };
        buf.clear();
    }
    Ok(notes)
}
