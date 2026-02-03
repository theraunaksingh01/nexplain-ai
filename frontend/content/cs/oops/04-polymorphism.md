
---

### 📄 `Polymorphism`

---

## Definition

Polymorphism means **one interface, multiple behaviors**.

The same method can behave differently depending on the object.

---

## Intuition

Think of the word “sound”:
- Dog → Bark
- Cat → Meow

Same action, different behavior.

---

## Types of Polymorphism

1. Compile-time (Method Overloading)
2. Runtime (Method Overriding)

---

## Example (Runtime Polymorphism)

```java
class Animal {
  void sound() {}
}

class Dog extends Animal {
  void sound() {
    System.out.println("Bark");
  }
}