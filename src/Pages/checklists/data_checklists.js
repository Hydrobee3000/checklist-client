const questionsTypes = {
  INPUT: 'INPUT',
  RADIO: 'RADIO',
  RADIO_PLUS_INPUT: 'RADIO_PLUS_INPUT',
  RADIO_WITH_ADDITIONAL_INPUT: 'RADIO_WITH_ADDITIONAL_INPUT',
  SELECT_SINGLE: 'SELECT_SINGLE',
  SELECT_MULTIPLE: 'SELECT_MULTIPLE',
}

export const checklistsData = {
  formsName: 'Тестировочная форма',
  id: 123,
  startTime: null, // время начала заполнения формы
  blocks: [
    {
      isExist: true,
      title: {
        text: 'blockTitle 1',
        remark: 'blockRemark 1', // подпись к блока (если передать массив строк - каждая переданная строка отобразится на новой строке)
      },
      order: 1, // нумерация блока ( пример: '1.' )

      questionsData: [
        {
          indexName: 'date', // название свойства, в которое запишется значение
          order: null, // нумерация вопроса ( пример: '1.' )
          title: 'Введите дату проверки', // сам вопрос
          titleRemark: null, // подпись к вопросу (если передать массив строк - каждая переданная строка отобразится на новой строке)
          type: 'date', // тип значения
          component: questionsTypes.INPUT,
          isRequire: true, // является ли вопрос обязательным
        },
        {
          indexName: 'tabNumber',
          order: null,
          title: 'Табельный номер',
          titleRemark: null,
          type: 'number',
          component: questionsTypes.INPUT,
          isRequire: true, // является ли вопрос обязательным
        },
        {
          indexName: 'smena',
          order: null,
          title: 'Введите смену',
          titleRemark: null,
          type: 'radio',
          component: questionsTypes.RADIO,
          isRequire: true,
          radio: [{ value: 'Смена 1' }, { value: 'Смена 2' }],
        },
        {
          indexName: 'lethalLocation',
          order: null,
          title: 'Локация смертельного риска:',
          titleRemark: null,
          type: 'text',
          component: questionsTypes.RADIO_PLUS_INPUT,
          isRequire: true,
          radio: [
            { value: 'PAUS 227', additionalInput: true },
            { value: 'bla', additionalInput: true },
          ],
        },
      ],
    },

    {
      isExist: true,
      title: {
        text: 'Смертельный риск ',
        remark: 'заполните смертельный риск', // подпись к блока (если передать массив строк - каждая переданная строка отобразится на новой строке)
      },
      order: 1, // нумерация блока ( пример: '1.' )

      questionsData: [
        {
          indexName: 'wheelChocks',
          order: '1.',
          title: 'Проверил огнетушители ',
          titleRemark: 'Наличие ',
          type: 'radio',
          component: questionsTypes.RADIO_WITH_ADDITIONAL_INPUT,
          isRequire: true,
          radio: [
            { name: 'wheelChocksTrue', value: 'Да' },
            { name: 'wheelChocksFalse', value: 'Нет' },
            { name: 'wheelChocksNotRequire', value: 'Не требуется' },
          ],
          additionalQuestion: {
            indexName: 'wheelChocksDop',
            type: 'checkbox',
            checkbox: [
              { name: 'wheelChocksWorkStop', value: 'Работы остановил' },
              { name: 'wheelChocksMaster', value: 'Доложил x' },
              { name: 'wheelChocksOther', value: 'Замечания ', require: false },
            ],
          },
        },
        {
          indexName: 'antiCollisionSystem',
          order: '2.',
          title: 'Проверил систему',
          titleRemark: 'Проверить исправность ',
          type: 'radio',
          component: questionsTypes.RADIO_WITH_ADDITIONAL_INPUT,
          isRequire: true,
          radio: [
            { name: 'antiCollisionSystemTrue', value: 'Да' },
            { name: 'antiCollisionSystemFalse', value: 'Нет' },
            { name: 'antiCollisionSystemNotRequire', value: 'Не требуется' },
          ],
          additionalQuestion: {
            indexName: 'antiCollisionSystemDop',
            type: 'checkbox',
            checkbox: [
              { name: 'antiCollisionSystemWorkStop', value: 'Работы остановил' },
              { name: 'antiCollisionSystemMaster', value: 'Доложил ' },
              { name: 'antiCollisionSystemOther', value: 'Замечания ', require: false },
            ],
          },
        },
      ],
    },
  ],

  // audioAlarm: {
  //   indexName: 'audioAlarm',
  //   type: 'radio',
  //   order: '3.',
  //   question: 'Проверил звуковую сигнализацию - исправна',
  //   questionRemark: 'Проверка работоспособности рабочего и сигнала заднего хода, перед началом работ',
  //   radio: [
  //     { name: 'audioAlarmTrue', value: 'Да' },
  //     { name: 'audioAlarmFalse', value: 'Нет' },
  //     { name: 'audioAlarmNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'audioAlarmDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'audioAlarmWorkStop', value: 'Работы остановил' },
  //       { name: 'audioAlarmMaster', value: 'Доложил непосредственному руководителю' },
  //       { name: 'audioAlarmIndependently', value: 'Устранил самостоятельно' },
  //       {
  //         name: 'audioAlarmGoingToStation',
  //         value: 'Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия',
  //       },
  //       { name: 'audioAlarmOther', value: 'Замечания по отклонению', require: false },
  //     ],
  //   },
  // },

  // exteriorLights: {
  //   indexName: 'exteriorLights',
  //   type: 'radio',
  //   order: '4.',
  //   question: 'Проверил внешние световые приборы - исправны',
  //   questionRemark: 'Проверка работы световых элементов: фар, габаритных огней, синего проблескового маячка, стоп-сигналов',
  //   radio: [
  //     { name: 'exteriorLightsTrue', value: 'Да' },
  //     { name: 'exteriorLightsFalse', value: 'Нет' },
  //     { name: 'exteriorLightsNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'exteriorLightsDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'exteriorLightsWorkStop', value: 'Работы остановил' },
  //       { name: 'exteriorLightsMaster', value: 'Доложил непосредственному руководителю' },
  //       { name: 'exteriorLightsIndependently', value: 'Устранил самостоятельно' },
  //       {
  //         name: 'exteriorLightsGoingToStation',
  //         value: 'Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия',
  //       },
  //       { name: 'exteriorLightsOther', value: 'Замечания по отклонению', require: false },
  //     ],
  //   },
  // },

  // steeringControl: {
  //   indexName: 'steeringControl',
  //   type: 'radio',
  //   order: '5.',
  //   question: 'Проверил рулевое управление – без замечаний',
  //   questionRemark: 'Визуально осмотреть сочление на наличие посторонних предметов, при наличии устранить.',
  //   radio: [
  //     { name: 'steeringControlTrue', value: 'Да' },
  //     { name: 'steeringControlFalse', value: 'Нет' },
  //     { name: 'steeringControlNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'steeringControlDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'steeringControlWorkStop', value: 'Работы остановил' },
  //       { name: 'steeringControlMaster', value: 'Доложил непосредственному руководителю' },
  //       { name: 'steeringControlIndependently', value: 'Устранил самостоятельно' },
  //       {
  //         name: 'steeringControlCalledForHelp',
  //         value: 'Вызвать ремонтный персонал для устранения неисправностей',
  //       },
  //       { name: 'steeringControlOther', value: 'Замечания по отклонению', require: false },
  //     ],
  //   },
  // },

  // checkWheels: {
  //   indexName: 'checkWheels',
  //   type: 'radio',
  //   order: '6.',
  //   question: 'Проверил колёса (шины и диски) - без замечаний',
  //   questionRemark:
  //     'Визуально проверить надежность крепления колес и наличие всех крепежных элементов. Осмотреть диски и шины на наличие повреждений, предельный износ протектора, признаков снижения давления в шинах.',
  //   radio: [
  //     { name: 'checkWheelsTrue', value: 'Да' },
  //     { name: 'checkWheelsFalse', value: 'Нет' },
  //     { name: 'checkWheelsNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'checkWheelsDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'checkWheelsWorkStop', value: 'Работы остановил' },
  //       { name: 'checkWheelsMaster', value: 'Доложил непосредственному руководителю' },
  //       { name: 'checkWheelsCalledForHelp', value: 'Вызвать ремонтный персонал для устранения неисправностей' },
  //       { name: 'checkWheelsOther', value: 'Замечания по отклонению', require: false },
  //     ],
  //   },
  // },

  // brakes: {
  //   indexName: 'brakes',
  //   type: 'radio',
  //   order: '7.',
  //   question: 'Проверил стояночный и рабочий тормоз - без замечаний',
  //   questionRemark: 'Остановка при нажатии педали/ неподвижность при нажатии кнопки стояночного тормоза',
  //   radio: [
  //     { name: 'brakesTrue', value: 'Да' },
  //     { name: 'brakesFalse', value: 'Нет' },
  //     { name: 'brakesNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'brakesDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'brakesWorkStop', value: 'Работы остановил' },
  //       { name: 'brakesMaster', value: 'Доложил непосредственному руководителю' },
  //       {
  //         name: 'brakesGoingToStation',
  //         value: 'Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия',
  //       },
  //       {
  //         name: 'brakesOther',
  //         value: 'Замечания по отклонению',
  //         remark: 'При несоответствии сюда обязательно вписать местоположение ',
  //         require: false,
  //       },
  //     ],
  //   },
  // },

  // hydroSystem: {
  //   indexName: 'hydroSystem',
  //   type: 'radio',
  //   order: '8.',
  //   question: 'Проверил гидросистему – без замечаний',
  //   questionRemark:
  //     'осмотр рукавов высокого давления на предмет износа, проверка уровня гидравлического масла, течь масла отсутствует',
  //   radio: [
  //     { name: 'hydroSystemTrue', value: 'Да' },
  //     { name: 'hydroSystemFalse', value: 'Нет' },
  //     { name: 'hydroSystemNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'hydroSystemDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'hydroSystemWorkStop', value: 'Работы остановил' },
  //       { name: 'hydroSystemMaster', value: 'Доложил непосредственному руководителю' },
  //       {
  //         name: 'hydroSystemGoingToStation',
  //         value: 'Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия',
  //       },
  //       { name: 'hydroSystemOther', value: 'Замечания по отклонению', require: false },
  //     ],
  //   },
  // },

  // checkVideoRecorder: {
  //   indexName: 'checkVideoRecorder',
  //   type: 'radio',
  //   order: '9.',
  //   question: 'Проверил комплект видеорегистратора - без замечаний',
  //   questionRemark:
  //     'Повреждения камеры, блока регистратора, блока питания и передатчика отсутствуют. После включения зажигания на блоке питания светится зелёный индикатор, на передатчике красный и зелёный. Объектив не загрезнён, помех для съёмки работы нет.',
  //   radio: [
  //     { name: 'checkVideoRecorderTrue', value: 'Да' },
  //     { name: 'checkVideoRecorderFalse', value: 'Нет' },
  //     { name: 'checkVideoRecorderNotRequire', value: 'Не требуется' },
  //   ],
  //   additionalQuestion: {
  //     indexName: 'checkVideoRecorderDop',
  //     type: 'checkbox',
  //     checkbox: [
  //       { name: 'checkVideoRecorderWorkStop', value: 'Работы остановил' },
  //       { name: 'checkVideoRecorderMaster', value: 'Доложил непосредственному руководителю' },
  //       {
  //         name: 'checkVideoRecorderOther',
  //         value: 'Замечания по отклонению',
  //         remark: 'При несоответствии сюда вписать местоположение',
  //         require: false,
  //       },
  //     ],
  //   },
  // },
}

// date: {
//   indexName: 'date', //название свойства, в которое запишется значение
//   type: 'date', //тип значения
//   order: null, // нумерация вопроса (пример: '1.')
//   question: 'Введите дату проверки', //сам вопрос
//   questionRemark: null, //подпись к вопросу
// },

// tabNumber: {
//   indexName: 'tabNumber',
//   type: 'number',
//   order: null,
//   question: 'Табельный номер',
//   questionRemark: null,
// },
// smena: {
//   indexName: 'smena',
//   type: 'radio',
//   order: null,
//   question: 'Введите смену',
//   questionRemark: null,
//   radio: [{ value: 'Смена 1' }, { value: 'Смена 2' }],
// },
// lethalLocation: {
//   indexName: 'lethalLocation',
//   type: 'radio',
//   order: null,
//   question: 'Локация смертельного риска:',
//   questionRemark: null,
//   radio: [{ value: 'PAUS 227' }],
// },
// wheelChocks: {
//   indexName: 'wheelChocks',
//   type: 'radio',
//   order: '1.',
//   question: 'Проверил противооткатные упоры, огнетушители – в наличии и исправны',
//   questionRemark: 'Наличие (комплектность) и надежность их крепления',
//   radio: [
//     { name: 'wheelChocksTrue', value: 'Да' },
//     { name: 'wheelChocksFalse', value: 'Нет' },
//     { name: 'wheelChocksNotRequire', value: 'Не требуется' },
//   ],
//   additionalQuestion: {
//     indexName: 'wheelChocksDop',
//     type: 'checkbox',
//     checkbox: [
//       { name: 'wheelChocksWorkStop', value: 'Работы остановил' },
//       { name: 'wheelChocksMaster', value: 'Доложил непосредственному руководителю' },
//       { name: 'wheelChocksCalledForHelp', value: 'Вызвать ремонтный персонал для устранения неисправностей' },
//       { name: 'wheelChocksOther', value: 'Замечания по отклонению', require: false },
//     ],
//   },
// },

// antiCollisionSystem: {
//   indexName: 'antiCollisionSystem',
//   type: 'radio',
//   order: '2.',
//   question: 'Проверил систему противостолкновения (СПС) - исправна',
//   questionRemark: 'Проверить, визульно исправность индикации и сигнализации системы противостолкновения.',
//   radio: [
//     { name: 'antiCollisionSystemTrue', value: 'Да' },
//     { name: 'antiCollisionSystemFalse', value: 'Нет' },
//     { name: 'antiCollisionSystemNotRequire', value: 'Не требуется' },
//   ],
//   additionalQuestion: {
//     indexName: 'antiCollisionSystemDop',
//     type: 'checkbox',
//     checkbox: [
//       { name: 'antiCollisionSystemWorkStop', value: 'Работы остановил' },
//       { name: 'antiCollisionSystemMaster', value: 'Доложил непосредственному руководителю' },
//       {
//         name: 'antiCollisionSystemGoingToStation',
//         value: 'Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия',
//       },
//       { name: 'antiCollisionSystemOther', value: 'Замечания по отклонению', require: false },
//     ],
//   },
// },
