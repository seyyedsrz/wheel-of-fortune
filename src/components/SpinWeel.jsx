
import { Box, Button, Dialog, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { closeIcon, smallCoin } from "../svg/svg";
import GetRandomNumberWithProbabilities from "../utils/GetRandomNumberWithProbabilities";




function SpinWheel({ spin, pageTexts }) {
    const [value, setValue] = useState(0);
    const [fortuneWheelItems, setFortuneWheelItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [fortuneWheelItem, setFortuneWheelItem] = useState({});

    const handleSpin = () => {
        setLoading(true);

        const wheelInner = document.querySelector(`.wheel__inner-${spin?.id}`);
        if (wheelInner) {
            wheelInner.classList.add("transition-0s");
            wheelInner.style.transform = `rotate(0deg)`;
        }

        let probabilities = {};
        fortuneWheelItems.forEach((item, index) => {
            probabilities[index] = item?.possibility || 0;
        });

        const randnum = GetRandomNumberWithProbabilities(probabilities);
        const numbersOfSlices = { 0: 0.0, 1: -0.111, 2: 0.75, 3: 0.62, 4: 0.1, 5: 0.36, 6: 0.26, 7: 0.13 };
        const randomRotation = Math.floor(numbersOfSlices[randnum] * 360 + 720);
        const finalRotation = (value + randomRotation) % 360;

        if (wheelInner) {
            wheelInner.classList.remove("transition-0s");
            wheelInner.style.transform = `rotate(${value + randomRotation}deg)`;
        }

        setValue(value + randomRotation);
        setTimeout(() => {
            setFortuneWheelItem(fortuneWheelItems[randnum] || {});
            setSuccessModal(true);
            setLoading(false);
            setOpen(false);
        }, 5000);
    };

    useEffect(() => {
        if (spin.fortune_wheel_items.length === 8) {
            setFortuneWheelItems(spin.fortune_wheel_items);
        } else {
            const tmp = [...spin.fortune_wheel_items];
            while (tmp.length < 8) {
                tmp.push({ name: pageTexts?.absurd, type: 2 });
            }
            setFortuneWheelItems(tmp.slice(0, 8));
        }
    }, [spin.fortune_wheel_items, pageTexts?.absurd]);

    return (
        <>
            <Box>
                <Box className="wheel-conrtainer">
                    <div className={`wheel wheel-${spin?.id}`}>
                        <div className={`wheel__inner wheel__inner-${spin?.id}`}>
                            {fortuneWheelItems.map((item, index) => (
                                <div className="wheel__sec" key={index}>
                                    <div className={item?.type === 2 ? "empty" : ""}>
                                        {item?.type === 1 && <span dangerouslySetInnerHTML={{ __html: smallCoin }} />} {item?.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="wheel__arrow">
                            {spin?.coin_count} <span dangerouslySetInnerHTML={{ __html: smallCoin }} />
                        </div>
                    </div>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={handleSpin}
                        sx={{
                            backgroundColor: "#FFB800!important",
                            color: "#131313!important",
                            width: "200px",
                            borderRadius: "10px",
                            mt: { md: "36px", xs: "24px" },
                        }}
                    >
                        Rotate
                    </Button>
                </Box>
            </Box>
 

            <Dialog open={successModal} onClose={() => setSuccessModal(false)} className="dialog-container">
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <IconButton onClick={() => setSuccessModal(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
                        <span dangerouslySetInnerHTML={{ __html: closeIcon }} />
                    </IconButton>
                    {fortuneWheelItem?.type === 2 ? (
                        <>
                            <Box sx={{ fontSize: "24px", fontWeight: "800" }}>{fortuneWheelItem?.name}</Box>
                            <Box sx={{ mt: 3 }}>This time luck was not on your side ):</Box>
                        </>
                    ) : (
                        <>
                            <Box sx={{ fontSize: "24px", fontWeight: "800" }}>
                                {fortuneWheelItem?.type === 1 && <span dangerouslySetInnerHTML={{ __html: smallCoin }} />} {fortuneWheelItem?.name}
                            </Box>                            
                        </>
                    )}
                </Box>
            </Dialog>
        </>
    );
}

export default SpinWheel;
