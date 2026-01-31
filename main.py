from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import your functions from the scripts you provided
from ml_models.train_pest_classifier import predict_pest 
import json

app = FastAPI()

# Enable CORS so your React app can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/predict-pest")
async def get_pest_prediction(data: dict):
    # This calls your Python model script
    result = predict_pest(
        data['crop'], data['growth_stage'], data['symptoms'],
        data['location'], data['season'], data['temperature'], data['humidity']
    )
    return result

@app.get("/api/demand-forecast")
async def get_forecast():
    with open('ml_models/demand_forecast.json', 'r') as f:
        return json.load(f)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)