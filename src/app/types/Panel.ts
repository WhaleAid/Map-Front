export type Panel = {
    id: string,
    name: string,
    address: string,
    status: "active" | "inactive",
    latitude: string,
    longitude: string,
    size: string,
    created_at?: Date,
    updated_at?: Date
}