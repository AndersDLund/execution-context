import { Component, OnInit } from '@angular/core';
import { Stack } from './models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  showPhaseOne: boolean = true;
  stack = new Stack;
  displayStack = [];
  timer: ReturnType<typeof setTimeout>;

  constructor() {
    this.stack.size.subscribe((value) => {
      console.log(value);
      clearTimeout(this.timer);
      if (value > 0) {
        this.timer = setInterval(() => {
          value === 0 ? clearInterval(this.timer) : this.formatStack('pop')
        }, 3000)
      } else {
        clearTimeout(this.timer);
      }
    })
  }

  ngOnInit(): void {

    setInterval(() => {
      this.showPhaseOne = !this.showPhaseOne;
    }, 10000);

    this.formatStack('push', 'Created global execution context');
  }

  wait(timeout: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  formatStack(command: any, state?: string) {
    command === 'push' ? this.stack.push(state) : this.stack.pop();

    if (this.stack.size.value === 1) {
      this.displayStack = [this.stack.first.value];
    } else if (this.stack.size.value > 1) {
      this.recursiveFormatStack(this.stack.first);
    } else {
      // stack is empty
      this.displayStack = [];
    }
  }

  recursiveFormatStack(item: any) {
    this.displayStack = [];
    this.recursion(item);
  }

  recursion(item: any) {
    if (!item.next) {
      this.displayStack.push(this.stack.last.value);
      return;
    }
    this.displayStack.push(item.value);
    this.recursion(item.next);
  }

  callFunction() {
    console.log(this.stack);

    if (this.stack.size.value <= 4) {
      this.formatStack('push', 'invoked function');
    }
  }
}
