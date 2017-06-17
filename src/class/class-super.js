/**
 * Created by hui on 16/11/13.
 * 
 * super 只可以引用父类的方法,不能引用父类的属性
 * 
 * 父类的方法和子类的同名方法是两个不同的引用
 * 父类的属性与子类的同名属性是同一个内存空间
 */

class A{
  constructor(){
    this.p = 2;
  }
}

class B extends A{
  constructor(){
    super();
    console.log(3333);
    console.log(super.p);
  }
}

new B();


class AA{
  p(){
    return 2
  }
}

class BB extends AA{
  constructor(){
    super()
    console.log(3333);
    console.log(super.p());
  }
}

new BB();