import { Pipe, PipeTransform } from '@angular/core';
import { strictEqual } from 'assert';

@Pipe({ name: 'formatRequestTitle' })
export class FormatRequestTitle implements PipeTransform {
    transform(title: string) {
        if (title.length > 20) {
            title = title.slice(0, 22);
            title += "...";
        }

        return title;
    }
}