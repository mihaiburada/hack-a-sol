import { Button } from "antd";

const Sidebar = () => {
    return (
        <div
            style={{
                padding: "4em",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button type="primary" size="large" onClick={() => { }}>
                {" "}
                Draw{" "}
            </Button>
        </div>
    )
}

export default Sidebar