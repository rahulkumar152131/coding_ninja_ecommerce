import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
const productContext = createContext();


export const useVaue = () => {
    const value = useContext(productContext);
    return value;
}


export const CustomContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allOrders, setAllOrders] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setlogin] = useState(false);
    const [user, setUser] = useState(null);
    const [originalProducts, setOriginalProducts] = useState([]);


    useEffect(() => {
        try {
            async function getProduct() {
                const allproduct = await axios.get("https://fakestoreapi.com/products");
                allproduct.data.map((product) => {
                    return product.price *= 80
                });
                setProducts(allproduct.data);
                setLoading(false);
            }
            getProduct();
        }catch(err){
            console.log(err);
        }
    }, []);
    console.log(products);


    const addToCart = async (product) => {
        const customId = Date.now().toString();

        try {
            if (user) {
                const cartRef = doc(db, "users", user.uid, "cart", customId); // Create a reference to the cart subcollection
                const alreadyInCart = carts.some((cart) => product.title === cart.title);
                if (!alreadyInCart) {
                    const cartItem = {
                        id: customId,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        qty: 1,
                    };

                    await setDoc(cartRef, cartItem); // Add the cart item to the cart subcollection

                    toast.success('Successfully added to Cart !!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                } else {
                    toast.error('Already in cart', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                    });
                }
            } else {
                toast.error('You are not Signin', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }


        } catch (error) {
            console.error("Error adding cart item:", error);
        }

    }
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {

                const unsubscribe = onSnapshot(query(collection(db, "users", user.uid, "cart"), orderBy("id", "desc")), (snapshot) => {
                    const carts = snapshot.docs.map((cart) => {
                        return cart.data();
                    });
                    setCarts(carts);
                    setLoading(false);
                });

                return () => {
                    unsubscribe();
                };
            }
        });
    }, [])

    const removeFromCart = async (id) => {
        // console.log(id);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await deleteDoc(doc(db, "users", user.uid, "cart", id));
            }
        })
    }

    const totalPrice = carts.reduce((acc, cart) => {
        return acc + cart.qty * cart.price;
    }, 0);

    const incCartQty = async (id) => {
        const cart = carts.find((cart) => cart.id === id);

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await updateDoc(doc(db, "users", user.uid, "cart", id), {
                    qty: cart.qty + 1,
                })
            }
        })
    }
    const decCartQty = async (id) => {
        const cart = carts.find((cart) => cart.id === id);

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (cart.qty > 1) {
                    await updateDoc(doc(db, "users", user.uid, "cart", id), {
                        qty: cart.qty - 1,
                    })
                } else {
                    await updateDoc(doc(db, "users", user.uid, "cart", id), {
                        qty: cart.qty - 1,
                    })
                    await deleteDoc(doc(db, "users", user.uid, "cart", id));
                }
            }
        })


    }

    const placeOrder = async (items) => {

        try {

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const customId = Date.now().toString();
                    const cartRef = doc(db, "users", user.uid, "orders", customId);

                    const order = items.map((item) => {
                        return {
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            qty: item.qty
                        }
                    });

                    await setDoc(cartRef, {
                        id: customId,
                        date: new Date().toISOString().slice(0, 10),
                        order: order

                    });
                    items.map(async (item) => {
                        await deleteDoc(doc(db, "users", user.uid, "cart", item.id));
                    });
                }
            })


            toast.success('Order placed Sucessfully !!', {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });

        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });
        }

    }

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(query(collection(db, "orders"), orderBy("id", "desc")), (snapshot) => {
    //         const allOrders = snapshot.docs.map((ordet) => {
    //             return ordet.data();
    //         });
    //         setAllOrders(allOrders);
    //         setLoading(false);
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])
    useEffect(() => {
        (async function () {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    await onSnapshot(query(collection(db, "users", user.uid, "orders"), orderBy("id", "desc")), (snapshot) => {
                        const allOrders = snapshot.docs.map((ordet) => {
                            return ordet.data();
                        });
                        setAllOrders(allOrders);
                        setLoading(false);
                    });
                }
            });
        })()


    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // console.log(uid.slice(1, 10));
                // setlogin(true);
                setUser(user)
                // ...
            } else {
                // User is signed out
                setUser(null);
                // ...
            }
        });
    }, []);
    // console.log(user);


    return (
        <productContext.Provider value={{
            loading,
            products,
            setProducts,
            addToCart,
            carts,
            removeFromCart,
            totalPrice,
            incCartQty,
            decCartQty,
            placeOrder,
            allOrders,
            setName,
            setEmail,
            setPassword,
            name,
            email,
            password,
            login,
            setlogin,
            setUser,
            user,
            originalProducts,
            setOriginalProducts,

        }}>
            {children}
        </productContext.Provider>
    );
}