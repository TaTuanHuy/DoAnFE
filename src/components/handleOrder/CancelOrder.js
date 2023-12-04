import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteOrder } from "../../service/order";
import { toast } from "react-toastify";
function CancelOrder({ id }) {
    async function handleDelete() {
        toast.success("Xóa thành công!", { theme: "dark", position: "top-center" });
        const data = await deleteOrder(id)
        if (data.message === "successfull") {
            window.location.reload();
        }
    }
    return (
        <>
            <h1 className="text-base text-black">
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers. Are you sure ?
            </h1>
            <Button
                variant="none"
                className="bg-red-600 py-2 px-3 rounded-sm text-white float-right ml-3"
                onClick={() => handleDelete()}
            >
                Delete
            </Button>
            <DialogTrigger className="float-right ">
                <Button variant="none" className="bg-blue-600 py-2 px-3 rounded-sm text-white ">
                    Cancel
                </Button>
            </DialogTrigger>
        </>
    );
}

export default CancelOrder;
