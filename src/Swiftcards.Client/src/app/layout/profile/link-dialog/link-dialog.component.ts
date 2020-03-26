import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Link } from 'src/app/models/link';

export interface DialogData {
  model: Link;
  edit: boolean;
}

@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html'
})
export class LinkDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onSubmit() {
    this.dialogRef.close(this.data);
  }

  onClose() {
    this.dialogRef.close();
  }

  onDelete() {
    let _data = Object.assign({}, this.data);
    _data.model = null;
    this.dialogRef.close(_data);
  }

}
