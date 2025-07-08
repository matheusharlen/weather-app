/* com o novo CSS no lugar, a aplicação deve ter uma aparência muito mais limpa e profissional.


  Para garantir que o layout e a apresentação dos dados estejam alinhados com o novo design, vou fazer alguns
  ajustes finais no App.js. Vou reorganizar a estrutura para melhorar a hierarquia visual e o espaçamento,
  garantindo que a interface fique mais intuitiva e agradável de usar. */
 /* ╭────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔  WriteFile Writing to client\src\App.js                                                              │
 │                                                                                                        │
 │    ... first 21 lines hidden ...   */                                                                     │
 │    26             setWeather(response.data);                                                           │
 │    ══════════════════════════════════════════════════════════════════════════════════════════════════  │
 │    35       };                                                                                         │
 │    36                                                                                                  │
 │    37       function formatarData(dataISO) {                                                           │
 │    37   -     const [ano, mes, dia] = dataISO.split('-');                                              │
 │    38   -     return `${dia}/${mes}/${ano}`;                                                           │
 │    38   +     const data = new Date(dataISO + 'T00:00:00');                                            │
 │    39   +     return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(data);               │
 │    40       }                                                                                          │
 │    41                                                                                                  │
 │    42       return (                                                                                   │
 │    42   -     <div className="container py-4">                                                         │
 │    43   +     <div className="container py-5">                                                         │
 │    44   +       <div className="row justify-content-center">                                           │
 │    45   +         <div className="col-md-8 col-lg-6">                                                  │
 │    46               <h1 className="text-center mb-4">Previsão do Tempo</h1>                            │
 │    47               <WeatherSearch onSearch={handleSearchCity} />                                      │
 │    48                                                                                                  │
 │    49               {weather ? (                                                                       │
 │    47   -         <div className="card mx-auto mt-4" style={{ maxWidth: '600px' }}>                    │
 │    48   -           <div className="card-body">                                                        │
 │    49   -             <h2 className="card-title text-center">                                          │
 │    50   +             <div className="card mx-auto mt-4">                                              │
 │    51   +               <div className="card-body p-4">                                                │
 │    52   +                 <div className="text-center">                                                │
 │    53   +                   <h2 className="card-title">                                                │
 │    54                         {weather.location.name}, {weather.location.country}                      │
 │    55                       </h2>                                                                      │
 │    56   +                   <p className="lead">{weather.current.condition.text}</p>                   │
 │    57   +                 </div>                                                                       │
 │    58                                                                                                  │
 │    53   -             <div className="text-center my-4">                                               │
 │    59   +                 <div className="d-flex align-items-center justify-content-center my-4">      │
 │    60                       <img                                                                       │
 │    61                         src={weather.current.condition.icon}                                     │
 │    62                         alt={weather.current.condition.text}                                     │
 │    63                         style={{ width: '100px', height: '100px' }}                              │
 │    64                       />                                                                         │
 │    59   -               <h3 className="display-4">{weather.current.temp_c}°C</h3>                      │
 │    60   -               <p className="lead">{weather.current.condition.text}</p>                       │
 │    65   +                   <h3 className="display-4 fw-bold                                           │
 │           ms-3">{Math.round(weather.current.temp_c)}°C</h3>                                            │
 │    66                     </div>                                                                       │
 │    67                                                                                                  │
 │    63   -             <div className="d-flex justify-content-around text-center mb-4">                 │
 │    68   +                 <div className="d-flex justify-content-around text-center border-top pt-3">  │
 │    69                       <div>                                                                      │
 │    65   -                 <p className="mb-1">Vento</p>                                                │
 │    66   -                 <h5>{weather.current.wind_kph} km/h</h5>                                     │
 │    70   +                     <p className="mb-1 small">Vento</p>                                      │
 │    71   +                     <h5 className="fw-bold">{weather.current.wind_kph} km/h</h5>             │
 │    72                       </div>                                                                     │
 │    73                       <div>                                                                      │
 │    69   -                 <p className="mb-1">Umidade</p>                                              │
 │    70   -                 <h5>{weather.current.humidity}%</h5>                                         │
 │    74   +                     <p className="mb-1 small">Umidade</p>                                    │
 │    75   +                     <h5 className="fw-bold">{weather.current.humidity}%</h5>                 │
 │    76                       </div>                                                                     │
 │    77                       <div>                                                                      │
 │    73   -                 <p className="mb-1">Índice UV</p>                                            │
 │    74   -                 <h5>{weather.current.uv}</h5>                                                │
 │    78   +                     <p className="mb-1 small">Índice UV</p>                                  │
 │    79   +                     <h5 className="fw-bold">{weather.current.uv}</h5>                        │
 │    80                       </div>                                                                     │
 │    81                     </div>                                                                       │
 │    82                                                                                                  │
 │    78   -             <h3 className="text-center mt-5 mb-4">Previsão para 3 Dias</h3>                  │
 │    83   +                 <h4 className="text-center mt-5 mb-3">Próximos 3 Dias</h4>                   │
 │    84                     <div className="row">                                                        │
 │    85                       {weather.forecast?.forecastday.map((day) => (                              │
 │    81   -                 <div className="col-md-4" key={day.date}>                                    │
 │    82   -                   <div className="card mb-3 weather-card">                                   │
 │    83   -                     <div className="card-body text-center">                                  │
 │    84   -                       <h5 className="card-title">{formatarData(day.date)}</h5>               │
 │    85   -                       <img className="weather-icon my-2" src={day.day.condition.icon}        │
 │           alt="Ícone condição" />                                                                      │
 │    86   -                       <p className="weather-condition">{day.day.condition.text}</p>          │
 │    87   -                       <p>                                                                    │
 │    88   -                         <span style={{ color: '#ff6b6b', fontWeight: '500'                   │
 │           }}>{day.day.maxtemp_c}°C</span> /                                                            │
 │    89   -                         <span style={{ color: '#6bA8ff', fontWeight: '500' }}>               │
 │           {day.day.mintemp_c}°C</span>                                                                 │
 │    86   +                     <div className="col-4" key={day.date}>                                   │
 │    87   +                       <div className="text-center">                                          │
 │    88   +                         <p className="fw-bold mb-1">{formatarData(day.date)}</p>             │
 │    89   +                         <img className="weather-icon my-1" src={day.day.condition.icon}      │
 │           alt="Ícone condição" />                                                                      │
 │    90   +                         <p className="mb-0">                                                 │
 │    91   +                           <span className="fw-bold">{Math.round(day.day.maxtemp_c)}°</span>  │
 │           /                                                                                            │
 │    92   +                           <span> {Math.round(day.day.mintemp_c)}°</span>                     │
 │    93                             </p>                                                                 │
 │    94                           </div>                                                                 │
 │    95                         </div>                                                                   │
 │    93   -                 </div>                                                                       │
 │    96                       ))}                                                                        │
 │    97                     </div>                                                                       │
 │    98                   </div>                                                                         │
 │    99                 </div>                                                                           │
 │    100              ) : (                                                                              │
 │    99   -         <div className='d-flex justify-content-center mt-4'>                                 │
 │    100  -           <div style={{ maxWidth: '600px', width: '100%' }}>                                 │
 │    101  +             <div className='mt-4'>                                                           │
 │    102                  <Skeleton />                                                                   │
 │    103                </div>                                                                           │
 │    103  -         </div>                                                                               │
 │    104              )}                                                                                 │
 │    105            </div>                                                                               │
 │    106  +       </div>                                                                                 │
 │    107  +     </div>                                                                                   │
 │    108      );                                                                                         │
 │    109    }                                                                                            │
 │    110                                                      