import * as api from '../api'
import { start, end, error, getLeadsReducer, getLeadReducer, getLeadsStatReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, } from '../reducer/lead'


export const getLeads = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeads()
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getEmployeeLeads = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeLeads()
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getLead = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLead(leadId)
        dispatch(getLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getLeadsStat = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadsStat()
        dispatch(getLeadsStatReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createOnsiteLead = (leadData, navigate) => async (dispatch) => {
    try {
        dispatch(start())

        const { data } = await api.createOnsiteLead(leadData)

        dispatch(createLeadReducer(data.result))
        navigate('/leads')

        dispatch(getLeads())
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createOnlineLead = (leadData, navigate) => async (dispatch) => {
    try {
        dispatch(start())

        const { data } = await api.createOnlineLead(leadData)

        dispatch(createLeadReducer(data.result))
        navigate('/leads')

        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateLead = (leadId, leadData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateLead(leadId, leadData)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteLead = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteLead(leadId)
        dispatch(deleteLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}