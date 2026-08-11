from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routes.auth import router as auth_router

app = FastAPI(
    title="Document-Intelligence-System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    traceback.print_exc()
    print("EXCEPTION:", repr(exc))
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )

app.include_router(auth_router)


@app.get("/")
async def root():

    return {
        "message": "Document-Intelligent-System API is running"
    }

