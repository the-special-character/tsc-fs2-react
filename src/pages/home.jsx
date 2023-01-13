import React, { useContext } from "react";
import { ProductContext } from "../context/productsContext";
import { connect } from "react-redux";
import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../context/cartContext";
import { Field, Form, Formik } from "formik";
import { loadProducts } from "../actions/productsAction";
import {
  addCart,
  deleteCart,
  loadCart,
  updateCart,
} from "../actions/cartAction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = ({
  products: { products, loading: productsLoading, error: productsError },
  cart: { cart, loading: cartLoading, error: cartError },
  loadProducts,
  loadCart,
  addCart,
  updateCart,
  deleteCart,
}) => {
  // const {
  //   productsState: { products, loading, error },
  //   loadProducts,
  // } = useContext(ProductContext);

  // const { cartState, loadCart, addCart, updateCart, deleteCart } =
  //   useContext(CartContext);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  if (productsLoading || cartLoading) {
    return <h1>Loading...</h1>;
  }

  if (productsError || cartError) {
    return <h1>{error?.message}</h1>;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid gap-y-8">
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        console.log(cartItem);
        return (
          <div
            key={product.id}
            className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8"
          >
            <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-3">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover object-center"
              />
            </div>
            <div className="sm:col-span-8 lg:col-span-9">
              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                {product.title}
              </h2>

              <section aria-labelledby="information-heading" className="mt-2">
                <h3 id="information-heading">{product.description}</h3>

                <p className="text-2xl text-gray-900">
                  {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format(product.price)}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating.rate > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {product.rating.rate} out of 5 stars
                    </p>
                    <a
                      href="#"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.rating.count} reviews
                    </a>
                  </div>
                </div>
              </section>

              <section aria-labelledby="options-heading" className="mt-10">
                <h3 id="options-heading" className="sr-only">
                  Product options
                </h3>

                {!!cartItem ? (
                  <div className="flex mt-6 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        updateCart({
                          ...cartItem,
                          quantity: cartItem.quantity + 1,
                        });
                      }}
                      className="flex-1 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      +
                    </button>
                    <p className="flex-1 text-center text-3xl">
                      {cartItem.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (cartItem.quantity <= 1) {
                          deleteCart(cartItem);
                        } else {
                          updateCart({
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                          });
                        }
                      }}
                      className="flex-1 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      addCart({
                        productId: product.id,
                        quantity: 1,
                      });
                    }}
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to bag
                  </button>
                )}

                {/* <Formik
                  initialValues={{
                    quantity: 0,
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    addCart({
                      productId: product.id,
                      quantity: Number(values.quantity),
                    });
                  }}
                >
                  {() => (
                    <Form>
                      <Field
                        component={Select}
                        name="quantity"
                        placeholder="Quanity"
                        id="quantity"
                        options={[
                          {
                            text: "1",
                            value: "1",
                          },
                          {
                            text: "2",
                            value: "2",
                          },
                          {
                            text: "3",
                            value: "3",
                          },
                          {
                            text: "4",
                            value: "4",
                          },
                          {
                            text: "5",
                            value: "5",
                          },
                        ]}
                      />
                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </Form>
                  )}
                </Formik> */}
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => loadProducts()(dispatch),
    loadCart: () => loadCart()(dispatch),
    addCart: (data) => addCart(data)(dispatch),
    updateCart: (data) => updateCart(data)(dispatch),
    deleteCart: (data) => deleteCart(data)(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
