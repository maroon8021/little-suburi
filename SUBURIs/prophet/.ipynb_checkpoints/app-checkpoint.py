from prophet import Prophet
import pandas as pd

df = pd.read_csv('./s.csv')
# Prophet では予測する列を y、日付データを ds とすることに注意して、Close を予測するモデルを作成してみます。
data = df.reset_index().rename(columns={'Sprint終了日': 'ds', '累計ポイント': 'y'}) 


m = Prophet()
m.fit(data)

future = m.make_future_dataframe(periods=7)
future.tail()
