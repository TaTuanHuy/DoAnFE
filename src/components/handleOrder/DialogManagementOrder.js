import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import "react-toastify/dist/ReactToastify.css";
import CancelOrder from "./CancelOrder";
import ChangeDelivered from "./ChangeDelevered";
function HandleOrder({ children, title, update, id, product, deleted, create, item, delivered }) {
    return (
        <Dialog className="w-1/3 ">
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="border border-solid border-black max-w-[50rem] bg-[#ccc] smt:max-w-[20rem] smt:h-[500px]  smt:overflow-scroll">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>    
                        {deleted && <CancelOrder id={id} />}
                        {delivered && <ChangeDelivered id={id} item={item}/>}
                    </DialogDescription>
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default HandleOrder;
