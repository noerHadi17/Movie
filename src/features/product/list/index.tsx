
import { Button } from "../../../components/button";
import CustomTable from "../../../components/table";
import { useProducts } from "../../../hooks/product/useProducts";
import type { Product } from "../../../services/product";
import { useNavigate } from "react-router";
import { deleteProduct } from "../../../services/product/api";

const List = () => {
  const navigate = useNavigate();
  const { products, fetchData } = useProducts();
  const columns = [
    {
      header: "Title",
      accessor: "title",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Price",
      accessor: "price",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Description",
      accessor: "description",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Action",
      accessor: "action",
      headerClassName: "text-left font-bold",
    },
  ];

  const data = products.map((product: Product) => ({
    id: product.id,
    title: product.title || "",
    price: product.price || 0,
    description: product.description || "",
    action: (
      <div className="flex flex-row gap-5">
        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
        <Button onClick={() => navigate(`?id=${product.id}#detail`)}>
          Edit
        </Button>
      </div>
    ),
  }));

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProduct(id);

      if (response) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => navigate("#detail")}>Add</Button>

      <CustomTable
        columns={columns}
        data={data}
        className="mt-4 border-collapse border border-gray-200 shadow-lg"
        headerClassName="bg-gray-100 text-gray-700"
        bodyClassName="bg-white"
      />
    </div>
  );
};

export default List;
