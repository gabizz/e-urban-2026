
import { useFormContext } from 'react-hook-form';
import parse, { Element } from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import '../../assets/form.css';
import { rawHtml } from './CerereAutorizatieHtml';

export default function CerereAutorizatie() {
  const { register } = useFormContext();

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.tagName === 'p') {
        if (domNode.children.length === 1 && domNode.children[0].type === 'tag' && domNode.children[0].name === 'strong') {
           const strongNode = domNode.children[0] as Element;
           const labelText = (strongNode.children[0] as any)?.data || '';
           
           if (labelText.includes('Nume și prenume')) {
             return (
               <p>
                 <strong>{labelText}</strong>
                 <input className="inline-input" {...register('solicitant.nume_denumire')} />
               </p>
             );
           }
           if (labelText.includes('CNP')) {
             return (
               <p>
                 <strong>{labelText}</strong>
                 <input className="inline-input" {...register('solicitant.cnp_cui')} />
               </p>
             );
           }
        }
      }
      return undefined;
    }
  };

  return (
    <div className="physical-form-container">
      {parse(rawHtml, options)}
    </div>
  );
}
