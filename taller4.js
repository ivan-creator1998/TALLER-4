// Clase Nodo
class Node {
  constructor(value) {
    this.value = value;      // Valor que almacena el nodo
    this.next = null;        // Referencia al siguiente nodo (inicia como null)
  }
}

// Clase LinkedList
class LinkedList {
  constructor() {
    this.head = null;        // Primer nodo de la lista
    this.tail = null;        // Último nodo de la lista
    this.size = 0;           // Número total de nodos
  }

  // Inserta un nodo al inicio de la lista (O(1))
  insertFirst(value) {
    const newNode = new Node(value); // Crear nuevo nodo
    newNode.next = this.head;        // Apuntar al antiguo primer nodo
    this.head = newNode;             // Actualizar el head al nuevo nodo

    if (!this.tail) {                // Si la lista estaba vacía
      this.tail = newNode;           // El nuevo nodo también es el tail
    }

    this.size++;                    // Aumentar el tamaño de la lista
  }

  // Inserta un nodo al final de la lista (O(1) si hay tail, O(n) si no)
  insertLast(value) {
    const newNode = new Node(value); // Crear nuevo nodo

    if (!this.head) {               // Si la lista está vacía
      this.head = newNode;          // Nuevo nodo es el head
      this.tail = newNode;          // Y también el tail
    } else {
      this.tail.next = newNode;     // Conectar el último nodo al nuevo
      this.tail = newNode;          // Actualizar el tail
    }

    this.size++;                    // Aumentar el tamaño
  }

  // Inserta un nodo en una posición específica (O(n))
  insertAt(index, value) {
    if (index < 0 || index > this.size) return null; // Índice inválido

    if (index === 0) return this.insertFirst(value);           // Insertar al inicio
    if (index === this.size) return this.insertLast(value);    // Insertar al final

    const newNode = new Node(value); // Crear nuevo nodo
    let current = this.head;         // Nodo actual
    let previous = null;             // Nodo anterior
    let i = 0;

    while (i < index) {              // Recorrer hasta la posición deseada
      previous = current;
      current = current.next;
      i++;
    }

    previous.next = newNode;         // Conectar anterior con nuevo
    newNode.next = current;          // Conectar nuevo con siguiente
    this.size++;                    // Aumentar tamaño
  }

  // Elimina el primer nodo (O(1))
  removeFirst() {
    if (!this.head) return null;    // Lista vacía

    const removed = this.head;      // Guardar nodo eliminado
    this.head = this.head.next;     // Actualizar head al siguiente
    this.size--;                    // Reducir tamaño

    if (this.size === 0) {          // Si la lista queda vacía
      this.tail = null;             // El tail también se elimina
    }

    return removed.value;           // Retornar valor eliminado
  }

  // Elimina el último nodo (O(n))
  removeLast() {
    if (!this.head) return null;    // Lista vacía

    if (this.size === 1) {          // Solo hay un nodo
      const removed = this.head;
      this.head = null;
      this.tail = null;
      this.size = 0;
      return removed.value;
    }

    let current = this.head;
    while (current.next !== this.tail) { // Recorrer hasta el penúltimo
      current = current.next;
    }

    const removed = this.tail;      // Guardar nodo eliminado
    current.next = null;            // Desconectar el último nodo
    this.tail = current;            // Actualizar tail
    this.size--;                   // Reducir tamaño

    return removed.value;
  }

  // Elimina un nodo en una posición específica (O(n))
  removeAt(index) {
    if (index < 0 || index >= this.size) return null; // Índice inválido

    if (index === 0) return this.removeFirst();                  // Eliminar al inicio
    if (index === this.size - 1) return this.removeLast();      // Eliminar al final

    let current = this.head;
    let previous = null;
    let i = 0;

    while (i < index) {              // Recorrer hasta el índice
      previous = current;
      current = current.next;
      i++;
    }

    previous.next = current.next;    // Saltar el nodo eliminado
    this.size--;                   // Reducir tamaño

    return current.value;            // Retornar valor eliminado
  }
}

// Función para medir tiempo de inserción
function medirTiempoInsercion(lista, metodo, cantidad) {
  console.time(`Tiempo ${metodo} (${cantidad} nodos)`); // Iniciar cronómetro

  for (let i = 0; i < cantidad; i++) {
    if (metodo === "insertFirst") {
      lista.insertFirst(i);         // Insertar al inicio
    } else if (metodo === "insertLast") {
      lista.insertLast(i);          // Insertar al final
    }
  }

  console.timeEnd(`Tiempo ${metodo} (${cantidad} nodos)`); // Mostrar duración
}

// Pruebas con diferentes tamaños de lista
const lista1 = new LinkedList();
medirTiempoInsercion(lista1, "insertFirst", 1000);
medirTiempoInsercion(lista1, "insertFirst", 10000);
medirTiempoInsercion(lista1, "insertFirst", 100000);

const lista2 = new LinkedList();
medirTiempoInsercion(lista2, "insertLast", 1000);
medirTiempoInsercion(lista2, "insertLast", 10000);
medirTiempoInsercion(lista2, "insertLast", 100000);
