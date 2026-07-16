export function extractAuthId(body:  unknown):string {
    if (typeof body !== 'object' || body === null) return '';
        const record = body as {
            user?: {
                authId?: string; _id?: string;
            };
            authId?: string;
            _id?: string;
        };
        return record.user?.authId ?? record.authId ?? record.user?._id ?? record._id ?? '';
    }
   

  