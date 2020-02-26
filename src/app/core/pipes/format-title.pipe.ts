import { Pipe, PipeTransform } from '@angular/core';
import { strictEqual } from 'assert';

@Pipe({ name: 'formatTitle' })
export class FormatTitle implements PipeTransform {
    transform(title: string) {
        if (title.length > 27) {
            title = title.slice(0, 28);
            title += "...";
        }

        return title;
    }
}