import { BehaviorSubject } from 'rxjs';

export class Node {
  value: number;
  next: any
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class Stack {
  first: any;
  last: any;
  size: BehaviorSubject<number>;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = new BehaviorSubject<number>(0);
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    let newValue = this.size.value;
    return this.size.next(++newValue);
  }

  pop() {
    if (!this.first) return null;
    let temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    let newValue = this.size.value;
    this.size.next(--newValue);
    return temp.value;
  }
}
