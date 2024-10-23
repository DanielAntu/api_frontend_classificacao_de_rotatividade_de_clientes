import joblib

model = joblib.load('modelo_classificador_de_rotatividade.pkl')

def load_model(list):
    prev = model.predict([list])
    return prev[0]

if __name__ == '__main__':
    print(load_model([619, 42, 24, 0.0, 1, 101348.88, 2, 0, 0, 1, 1, 2, 1]))