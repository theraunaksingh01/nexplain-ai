# Classes and Objects

## Class

A class is a **blueprint** that defines the properties and behaviors of an object.

It does not occupy memory by itself.

---

## Object

An object is an **instance of a class**.

It represents a real entity created using the class blueprint.

---

## Intuition

- Class → Design
- Object → Actual thing created from the design

---

## Example (Java)

```java
class Car {
  String color;

  void drive() {
    System.out.println("Car is driving");
  }
}

Car myCar = new Car();