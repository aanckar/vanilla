async function fetchProducts({ title }) {
  const params = new URLSearchParams();
  params.append("title", title);
  const res = await fetch(`/api/products.php?${params.toString()}`);
  const json = await res.json();
  return json;
}

export default function init() {
  const productsInput = document.getElementById("product");
  const productsDatalist = document.getElementById("products");
  productsInput.addEventListener("keyup", async (e) => {
    const title = e.target.value;
    if (!e.key || !title || title.length < 3) {
      return;
    }
    const results = await fetchProducts({ title });
    productsDatalist.innerHTML = "";
    results.forEach((res) => {
      const option = document.createElement("option");
      option.value = res.title;
      option.innerHTML = res.description;
      option.dataset.sku = res.sku;
      productsDatalist.appendChild(option);
    });
  });
}
