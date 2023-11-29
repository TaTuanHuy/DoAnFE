import Link from "next/link";
import TbContent from "@/components/table/tableContent";

function Management() {
    return (
        <div
            className="h-min-[500px] smt:px-5"
        >
            <h1 className="py-[15px] text-[14px] ">
                <Link
                    style={{
                        paddingLeft: '40px'
                    }}

                    href={"/"}
                >HOME</Link>/ MANAGEMENT
            </h1>
            <TbContent />
        </div>
    );
}

export default Management;
