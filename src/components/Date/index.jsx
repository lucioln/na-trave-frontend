import {addDays,subDays, format, formatISO} from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { Icon } from '../Icon';

export const DateSelect = ({currentDate, onChange}) => { 
    
    const prevDay = () => {
        const prevDate = subDays(new Date(currentDate),1)
        onChange(formatISO(prevDate));  
    }

    const nextDay = () => {
        const nextDate = addDays(new Date(currentDate),1)
        onChange(formatISO(nextDate));  
    }
    
    return (
    <div className='flex items-center justify-center space-x-4 text-center text-red-500'>
        <Icon name="arrowLeft" className='w-6' onClick={prevDay} />
        <span className='text-black font-bold'>{format(new Date(currentDate), "d 'de' MMMM", {locale: ptBR})}</span>
        <Icon name="arrowRight" className='w-6' onClick={nextDay}/>
    </div>
    )

}