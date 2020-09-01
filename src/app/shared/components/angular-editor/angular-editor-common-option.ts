import { AngularEditorConfig } from '@kolkov/angular-editor';

export const commonEditorConfig: AngularEditorConfig = {
  editable: true,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'fontName',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull'
    ],
    [
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule'
    ]
  ],
  customClasses: [
    {
      name: 'Justify Right',
      class: 'right_to_left',
      tag: 'p'
    },
    {
      name: 'Justify Left',
      class: 'left_to_right',
      tag: 'p'
    }
  ]
};
