#[derive(Debug, Default, Clone)]
pub struct Note {
    pub frequency: isize,
    pub octave: String,
    pub step: String,
    pub duration: isize,
}

impl Note {
    pub fn generate_note(&self) -> String {
        self.step.clone() + &self.octave
    }
}
