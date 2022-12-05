const getProducts = async () => {
    const response = await fetch("/productos");
    const data = await response.json();
    console.log(data);
};
getProducts();