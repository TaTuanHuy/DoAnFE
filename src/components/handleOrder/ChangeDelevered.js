import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { isDelivered } from "../../service/order";
import { toast } from "react-toastify";
function ChangeDelivered({ id, item }) {
    async function changeDelivered() {
        toast.success("Thay đổi thành công!", { theme: "dark", position: "top-center" });
        item.isDelivered = true
        const data = await isDelivered(id, item)
        if (data.message === "succesfull") {
            window.location.reload();
        }
    }
    return (
        <>
            <h1 className="text-base text-black">
                Bạn muốn xác nhận đơn hàng này đã được giao?
            </h1>
            <Button
                variant="none"
                className="bg-green-600 py-2 px-3 rounded-sm text-white float-right ml-3"
                onClick={() => changeDelivered()}
            >
                Xác nhận
            </Button>
            <DialogTrigger className="float-right ">
                <Button variant="none" className="bg-blue-600 py-2 px-3 rounded-sm text-white ">
                    Cancel
                </Button>
            </DialogTrigger>
        </>
    );
}

export default ChangeDelivered;
