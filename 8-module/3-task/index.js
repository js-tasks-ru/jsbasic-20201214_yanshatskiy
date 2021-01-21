export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(
      (item) => item.product.name === product.name
    );

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    if (!cartItem) {

      return;

    } else {
      cartItem.count += amount;

      if (cartItem.count === 0) {
        const newArr = [];
        this.cartItems.forEach((item) => {
          if (item !== cartItem) {
            newArr.push(item);
          }
        });
        this.cartItems = newArr;
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    const isEmpty = this.cartItems.length === 0;

    return isEmpty;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((item) => (totalCount += item.count));

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(
      (item) => (totalPrice += item.product.price * item.count)
    );

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
