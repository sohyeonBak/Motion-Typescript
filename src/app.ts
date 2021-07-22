import { TextSectionInput } from './components/page/dialog/input/text-input.js';
import { MediaSectionInput } from './components/page/dialog/input/media-input.js';
import { InputDialog } from './components/page/dialog/dialog.js';
import { Component } from './components/component.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    // this.page.addChild(image)

    // const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/VIjtBfXzxf0');
    // this.page.addChild(video)

    // const note = new NoteComponent('Note 1', 'Note content')
    // this.page.addChild(note)

    // const todo = new TodoComponent('Todo List', 'cooking');
    // this.page.addChild(todo)

    const imageBtn = document.querySelector('#new-image')! as HTMLElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(()=>{
        dialog.removeFrom(dialogRoot)
      })

      dialog.setOnSubmitListener(()=>{
        const image = new ImageComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image)
        dialog.removeFrom(dialogRoot);
      })
    });

    const videoBtn = document.querySelector('#new-video')! as HTMLElement;
    videoBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(()=>{
        dialog.removeFrom(dialogRoot)
      })

      dialog.setOnSubmitListener(()=>{
        const video = new VideoComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(video)
        dialog.removeFrom(dialogRoot);
      })
    });

    const noteBtn = document.querySelector('#new-note')! as HTMLElement;
    noteBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const textSection = new TextSectionInput
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(()=>{
        dialog.removeFrom(dialogRoot)
      })

      dialog.setOnSubmitListener(()=>{
        const note = new NoteComponent(textSection.title, textSection.body);
        this.page.addChild(note)
        dialog.removeFrom(dialogRoot);
      })
    });

    const todoBtn = document.querySelector('#new-todo')! as HTMLElement;
    todoBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const textSection = new TextSectionInput
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(()=>{
        dialog.removeFrom(dialogRoot)
      })

      dialog.setOnSubmitListener(()=>{
        const todo = new TodoComponent(textSection.title, textSection.body);
        this.page.addChild(todo)
        dialog.removeFrom(dialogRoot);
      })
    });

  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)