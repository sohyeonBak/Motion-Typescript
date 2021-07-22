import { TextSectionInput } from './components/page/dialog/input/text-input.js';
import { MediaSectionInput } from './components/page/dialog/input/media-input.js';
import { InputDialog, MediaData, TextData } from './components/page/dialog/dialog.js';
import { Component } from './components/component.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';


type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T
}

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image', 
      MediaSectionInput, 
      (input: MediaSectionInput)=> new ImageComponent(input.title, input.url)
    )

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video', 
      MediaSectionInput, 
      (input: MediaSectionInput)=> new VideoComponent(input.title, input.url)
    )

    this.bindElementToDialog<TextSectionInput>(
      '#new-note', 
      TextSectionInput, 
      (input: TextSectionInput)=> new NoteComponent(input.title, input.body)
    )

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo', 
      TextSectionInput, 
      (input: TextSectionInput)=> new TodoComponent(input.title, input.body)
    )
  
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component >(
    selector: string, 
    InputComponent: InputComponentConstructor<T>, 
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLElement;
      element.addEventListener('click', () => {
        const dialog = new InputDialog()
        const input = new InputComponent();
        dialog.addChild(input);
        dialog.attachTo(this.dialogRoot);

        dialog.setOnCloseListener(()=>{
          dialog.removeFrom(this.dialogRoot)
        })

        dialog.setOnSubmitListener(()=>{
          const todo = makeSection(input)
          this.page.addChild(todo)
          dialog.removeFrom(this.dialogRoot);
        })

      });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)