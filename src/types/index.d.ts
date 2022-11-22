export{}

declare global{
    namespace Express{
        interface Request{
            err:err.status;
            
        }
    }
}