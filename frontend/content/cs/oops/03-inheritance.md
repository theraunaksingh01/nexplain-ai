
---

# **Inheritance**

---

## Definition

Inheritance allows one class to **acquire properties and methods** of another class.

---

## Intuition

Inheritance is like a child inheriting traits from parents.

---

## Why It Matters

- Promotes code reuse
- Reduces duplication
- Makes systems easier to extend

---

## Example (Java)

```java
class Animal {
  void eat() {}
}

class Dog extends Animal {
  void bark() {}
}