import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'fullImageUrl',
  standalone: true
})
export class FullImageUrlPipe implements PipeTransform {
  transform(relativePath: string): string {
    if(relativePath.startsWith('https://') || relativePath.startsWith('http://')){
      return relativePath;
    }
    if(relativePath.startsWith('/api')) relativePath = relativePath.slice(4);
    return `${environment.apiUrl}${relativePath}`;
  }
}
