import { PlusSquare } from "lucide-react";
import NewAndUpdateProduct from "./formManagement";
import TableProduct from "./tableProduct";
import { Button } from "../ui/button";
import TableOrder from "./tableOrder";
import TableUser from "./tableUser";
import TableReckon from './tableReckon'

function Content({ search }) {
    return (
        <div className="w-[80%] py-6 ml-7 space-y-4 smt:w-screen smt:ml-0">
            {search === "product" && (
                <>
                    <h1 className="font-bold text-xl text-center">Tất cả sản phẩm</h1>
                    <NewAndUpdateProduct title={"Create some new product"} create>
                        <Button variant="none">
                            <PlusSquare size={100} />
                        </Button>
                    </NewAndUpdateProduct>
                    <TableProduct />
                </>
            )}
            {search === "order" && (
                <>
                    <h1 className="font-bold text-xl text-center">Tất cả đơn đặt hàng</h1>
                    <TableOrder />
                </>
            )}
            {search === 'user' && (
                <>
                    <h1 className="font-bold text-xl text-center">tất cả người dùng</h1>
                    <TableUser />
                </>
            )}
            {search === 'statistical' && (
                <>
                    <h1 className="font-bold text-xl text-center">Thống kê</h1>
                    <TableReckon />
                </>
            )}
        </div>
    );
}

export default Content;
