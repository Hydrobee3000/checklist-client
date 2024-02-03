const ADDITIONAL = 'Dop' // указатель для объекта данных дополнительного вопроса '[indexName]Dop' Пр.: 'audioAlarmDop'

/* указатели для ответов на дополнительный вопрос '[indexName]указатель' Пр.: 'audioAlarmWorkStop' */

const WORK_STOP = 'WorkStop' // Работы остановил
const MASTER = 'Master' // Доложил мастеру / Доложил ИТР / Доложил непосредственному руководителю
const DISPATCHER = 'Dispatcher' // Сообщил диспетчеру (4022, 122, +79192871738)
const INDEPENDENTLY = 'Independently' // Устранил самостоятельно
const PROHIBITION = 'Prohibition' // Повесил запрещающий аншлаг
const DISABLED = 'Disabled' // Вывел из эксплуатации
const RETRIEVED = 'Retrieved' // Тормозной башмак изъят
const REPLACEMENT = 'Replacement' // Замена тормозных башмаков на исправные
const LOG = 'Log' // Сделал запись в журнале
const BACKUP = 'Backup' // Взял резервную
const CALLED_FOR_HELP = 'CalledForHelp' // Вызвать ремонтный персонал для устранения неисправностей
const GOING_TO_STATION = 'GoingToStation' // Направляюсь в пункт обслуживания самоходного оборудования (ПОСО) для устранения несоответствия
export const OTHER = 'Other' // Замечания по отклонению [input]

// список всех вариантов дополнительных ответов
export const allAdditionalIndexes = [
  WORK_STOP,
  MASTER,
  DISPATCHER,
  INDEPENDENTLY,
  PROHIBITION,
  DISABLED,
  RETRIEVED,
  REPLACEMENT,
  LOG,
  BACKUP,
  CALLED_FOR_HELP,
  GOING_TO_STATION,
  // OTHER - блок 'замечания по отклонению' не зависит от выбора других ответов
]
