#!/usr/bin/env python
"""
Simple script to compile .po files to .mo files using polib
"""
import os
import polib

def compile_po_files():
    """Compile all .po files to .mo files"""
    locale_dir = 'locale'
    
    if not os.path.exists(locale_dir):
        print("No locale directory found")
        return
    
    for lang_dir in os.listdir(locale_dir):
        lang_path = os.path.join(locale_dir, lang_dir)
        if not os.path.isdir(lang_path):
            continue
            
        lc_messages_path = os.path.join(lang_path, 'LC_MESSAGES')
        if not os.path.exists(lc_messages_path):
            continue
            
        po_file = os.path.join(lc_messages_path, 'django.po')
        mo_file = os.path.join(lc_messages_path, 'django.mo')
        
        if os.path.exists(po_file):
            try:
                po = polib.pofile(po_file)
                po.save_as_mofile(mo_file)
                print(f"Compiled {po_file} -> {mo_file}")
            except Exception as e:
                print(f"Error compiling {po_file}: {e}")

if __name__ == '__main__':
    compile_po_files()
