import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { NgxTweetService } from '../services/ngx-tweet.service';

@Component({
    selector: 'ngx-tweet',
    template: '<ng-content *ngIf="isTwitterScriptLoading"></ng-content>',
    styles: [ '.twitter-tweet { transform: none !important; }' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTweetComponent implements OnInit {
    @Input() public tweetId: string;
    @Input() public twitterConfig: any = {};

    public isTwitterScriptLoading: boolean = true;

    constructor(private readonly _elementRef: ElementRef,
                private readonly _ngxTweetService: NgxTweetService,
                private readonly _changeDetectorRef: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this._loadTwitterScript();
    }

    private _loadTwitterScript(): void {
        this._ngxTweetService
            .loadScript()
            .subscribe((twitterData: any) => {
                this._updateTwitterScriptLoadingState();
                twitterData.widgets.createTweet(this.tweetId, this._elementRef.nativeElement, this.twitterConfig);
            });
    }

    private _updateTwitterScriptLoadingState(): void {
        this.isTwitterScriptLoading = false;
        this._changeDetectorRef.detectChanges();
    }
}
