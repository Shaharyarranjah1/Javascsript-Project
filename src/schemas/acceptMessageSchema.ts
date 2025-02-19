import {boolean, z} from "zod"

    export const AcceptMessageSchema = z.object({
        acceptMessage : boolean(),
       
    })