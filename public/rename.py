import os

def rename_files(root_folder):
    for foldername, subfolders, filenames in os.walk(root_folder):
        for filename in filenames:
            if '.opti.opti' in filename:
                old_path = os.path.join(foldername, filename)
                new_filename = filename.replace('.opti.opti', '')
                new_path = os.path.join(foldername, new_filename)

                # Rename the file
                os.rename(old_path, new_path)
                print(f'Renamed: {old_path} -> {new_path}')

# Example usage
rename_files('./')
