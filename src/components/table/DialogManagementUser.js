import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import "react-toastify/dist/ReactToastify.css";
import DeleteUser from "../handleUser/deleteUser";
import ChangeAdmin from "../handleUser/changeAdmin";
function HandleUser({ children, title, update, id, product, deleted, create, item }) {
    return (
        <Dialog className="w-1/3 ">
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="border border-solid border-black max-w-[50rem] bg-[#ccc] smt:max-w-[20rem] smt:h-[500px]  smt:overflow-scroll">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>
                        {update && <ChangeAdmin id={id} item={item}/>}    
                        {deleted && <DeleteUser id={id} />}
                    </DialogDescription>
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default HandleUser;
