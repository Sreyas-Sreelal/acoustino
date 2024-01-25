#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util;
use util::do_conversion;

#[tauri::command]
fn convert(file: &str, pin: isize) -> Result<String,String> {
    print!("file is {}", file);
    match do_conversion(file, pin) {
        Ok(output) => Ok(output),
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
