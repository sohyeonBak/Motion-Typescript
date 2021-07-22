import { Component } from './components/component.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(image)

    const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/VIjtBfXzxf0');
    this.page.addChild(video)

    const note = new NoteComponent('Note 1', 'Note content')
    this.page.addChild(note)

    const todo = new TodoComponent('Todo List', 'cooking');
    this.page.addChild(todo)
  }
}

new App(document.querySelector('.document')! as HTMLElement)