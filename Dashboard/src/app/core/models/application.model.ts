import { empty } from 'rxjs';

export class Application {
    public AwaitingToConnect: boolean = false;
    public AwaitingToDeconnect: boolean = false;
    public WaitingToConfirm: boolean = false;
    constructor(
        public Id: string,
        public IsConnected: boolean,
        public Name: string,
        public WebsiteUrl: string,
        public IconPath: string
    ) { }

    static from(json: any): Application {

        // to avoid issues with image routing in prod (should probably be done better for future)
        // will probably be another GUID in dev
        let iconPath = './assets/img/connectedapps/unknown.png';
        if (json["id"] == '12baff4a-3549-4a51-ae7e-88908f796ba9') {
            iconPath = './assets/img/connectedapps/office365.jpg';
        }

        return new Application(json["id"], json["isConnected"], json["name"], json["websiteURL"], iconPath);
    }
}
