import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { changeAmdin } from "../../service/order";
import { toast } from "react-toastify";
function ChangeAdmin({ id, item }) {
    async function handleChageAdmin() {
        toast.success("Thay đổi thành công!", { theme: "dark", position: "top-center" });
        const token = localStorage.getItem('access_token')
        const data = await changeAmdin(token, id, item)
        if (data.message === "succesfull") {
            window.location.reload();
        }
    }
    return (
        <>
            <h1 className="text-base text-black">
                Bạn muốn thay đổi người dùng này thành Admin? Bạn chắc chắn với điều đó chứ?
            </h1>
            <Button
                variant="none"
                className="bg-green-600 py-2 px-3 rounded-sm text-white float-right ml-3"
                onClick={() => handleChageAdmin()}
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

export default ChangeAdmin;
