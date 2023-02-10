import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input() label: string = 'Upload document';
  @Input() accept: string = '.pdf,.png,.jpg';
  @Output() readonly fileSelected = new EventEmitter<string>();

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (file) {
      this.fileSelected.emit(file.name);
    }
  }
}
