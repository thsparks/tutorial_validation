//% block="Tutorial Controls"
//% icon="\uf0e0"
//% color="#378273"
namespace tutorialcontrols {
    // Must match MakeCode internal representation
    interface TutorialValidationResult {
        isValid: boolean;
        message?: string;
    }

    //% block="send tutorial validion result isValid $isValid ||with $message"
    //% blockId=tcsendvalidationresult
    //% weight=50
    export function sendValidationResult(isValid: boolean, message?: string) {
        if (!message) {
            message = ""; // Was getting deserialization issues without this.
        }

        const data: TutorialValidationResult = { isValid, message };
        const toSend = JSON.stringify(data);
        const buf = Buffer.create(toSend.length);
        for (let i = 0; i < toSend.length; ++i) {
            buf[i] = toSend.charCodeAt(i);
        }

        control.simmessages.send("tutorialcodevalidation", buf, true /** noBroadcast */);
    }
}